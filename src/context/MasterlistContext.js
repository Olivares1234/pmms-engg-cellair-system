import React, { createContext, useReducer } from "react";
import moment from "moment";
import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  GET_OPTIONS,
  reducer,
} from "./MasterlistReducer";
import axios from "axios";
import { API } from "../config/config";
import { displayErrors, displayNotification } from "../config/display";
import { headers } from "../config/token";

export const MContext = createContext({});

const MasterlistContext = ({ children }) => {
  const initialValue = {
    itemList: [],
    unitsOption: [],
    customerList: [],
    conversions: [],
  };

  const [masterlist, dispatch] = useReducer(reducer, initialValue);

  const getItems = (setLoading, filter) => {
    setLoading(true);
    axios
      .get(API + `pmms/masterlist`, headers())
      .then((res) => {
        const { itemList } = res.data;

        dispatch({
          type: GET_ITEMS,
          payload: {
            itemList,
          },
        });
      })
      .catch((err) => displayErrors(err))
      .finally(() => setLoading(false));
  };

  const addItem = (values, resetForm, setSubmitting) => {
    const data = new FormData();
    for (const key in values) {
      let val = values[key];
      if (values[key] === null) val = "";

      if (Array.isArray(val)) {
        console.log(" im array");
        val.forEach((_v, i) => {
          console.log(key, i);
          data.append(`${key}[]`, val[i]);
        });
        continue;
      }
      data.append(key, val);
    }

    axios
      .post(API + `pmms/masterlist`, data, headers())
      .then((res) => {
        const { newItem, message } = res.data;
        dispatch({
          type: ADD_ITEM,
          payload: {
            newItem,
          },
        });

        displayNotification("success", message);
        setSubmitting(false);
        resetForm();
      })
      .catch((err) => {
        displayErrors(err);
        setSubmitting(false);
      });
  };

  const editItem = (values, setSubmitting) => {
    //remove unneccessary
    delete values.customer_label;
    delete values.dwg;
    delete values.bom;
    delete values.costing;
    delete values.attachment;

    axios
      .put(API + `pmms/masterlist/${values.id}`, values, headers())
      .then((res) => {
        const { newItem, message } = res.data;
        dispatch({
          type: EDIT_ITEM,
          payload: {
            newItem,
            id: values.id,
          },
        });

        displayNotification("success", message);
        setSubmitting(false);
      })
      .catch((err) => {
        displayErrors(err);
        setSubmitting(false);
      });
  };

  const deleteItem = (id, setLoading) => {
    setLoading(true);
    axios
      .delete(API + `pmms/masterlist/${id}`, headers())
      .then((res) => {
        const { message } = res.data;
        dispatch({
          type: DELETE_ITEM,
          payload: {
            id,
          },
        });

        displayNotification("success", message);
        setLoading(false);
      })
      .catch((err) => {
        displayErrors(err);
        setLoading(false);
      });
  };

  const downloadAttachment = (id, type, setLoading) => {
    setLoading(true);
    axios({
      url: API + `pmms/masterlist/attachment/${id}/${type}`,
      method: "get",
      responseType: "blob",
      ...headers(),
    })
      .then((res) => {
        displayNotification("success", "File successfully generated");
        //Create a Blob from the PDF Stream
        const file = new Blob([res.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
        setLoading(false);
      })
      .catch((err) => {
        displayErrors(err);
        setLoading(false);
      });
  };

  const addAttachment = async (values, setLoading) => {
    setLoading(true);
    const data = new FormData();
    for (let key in values) {
      data.append([key], values[key]);
    }

    try {
      const res = await axios.post(
        API + `pmms/masterlist/attachment`,
        data,
        headers()
      );
      const { message, newItem } = res.data;
      dispatch({
        type: EDIT_ITEM,
        payload: {
          newItem,
          id: newItem.id,
        },
      });
      displayNotification("success", message);
      setLoading(false);
    } catch (err) {
      displayErrors(err);
      setLoading(false);
      throw new Error();
    }
  };

  const deleteAttachment = async (id, type, setLoading) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        API + `pmms/masterlist/attachment/${id}?type=${type}`,
        headers()
      );
      const { message, newItem } = res.data;
      dispatch({
        type: EDIT_ITEM,
        payload: {
          newItem,
          id: newItem.id,
        },
      });
      displayNotification("success", message);
      setLoading(false);
    } catch (err) {
      displayErrors(err);
      setLoading(false);
      throw new Error();
    }
  };

  const getOptions = (setLoading) => {
    setLoading(true);
    const getCustomer = () =>
      axios.get(API + `pmms/masterlist/option/customers`, headers());
    const getConversion = () =>
      axios.get(API + `pmms/masterlist/option/conversions`, headers());
    const getUnits = () => axios.get(API + `options/units`);

    axios
      .all([getCustomer(), getUnits(), getConversion()])
      .then(
        axios.spread((customer, units, conversion) => {
          const { customerList } = customer.data;
          const { unitsOption } = units.data;
          const { conversions } = conversion.data;

          dispatch({
            type: GET_OPTIONS,
            payload: {
              customerList,
              unitsOption,
              conversions,
            },
          });
          setLoading(false);
        })
      )
      .catch((err) => {
        displayErrors(err);
        setLoading(false);
      });
  };

  const exportCsv = (setLoading) => {
    setLoading(true);
    const dateNow = moment().format("Y_M_D");
    axios({
      url: API + `pmms/masterlist/export`,
      method: "get",
      responseType: "blob",
      ...headers(),
    })
      .then((res) => {
        displayNotification("success", "File successfully generated");
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("target", "_blank");
        link.setAttribute(
          "download",
          `Product&Materials_masterlist_as_of_${dateNow}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
        link.parentElement.removeChild(link);
        setLoading(false);
      })
      .catch((err) => {
        displayErrors(err);
        setLoading(false);
      });
  };

  return (
    <MContext.Provider
      value={{
        masterlist,
        getItems,
        addItem,
        editItem,
        deleteItem,
        downloadAttachment,
        deleteAttachment,
        addAttachment,
        getOptions,
        exportCsv,
      }}
    >
      {children}
    </MContext.Provider>
  );
};

export default MasterlistContext;
