import React, { useContext, useEffect, Fragment } from "react";
import moment from "moment";
import { MContext } from "../../context/MasterlistContext";
import { Utils } from "../../context/UtilsContext";
import { Row, Col, Button, Spin, Divider } from "antd";
import { Formik, Field, Form, FieldArray } from "formik";
import {
  AntInput,
  AntDatePicker,
  AntInputNumber,
  AntSelect,
} from "../AntField";
import Confirm from "../Confirm";

import { validateItemForm } from "../../validation/validation";
import { FormikDebug } from "@jbuschke/formik-antd";

const FileUpload = React.lazy(() => import("../FileUpload/FileUpload"));
const MasterlistForm = (props) => {
  const { data } = props;
  const {
    addItem,
    getOptions,
    editItem,
    masterlist: { customerList, unitsOption, conversions },
  } = useContext(MContext);
  const { setLoading } = useContext(Utils);

  const defaultValues = {
    code: "",
    mspecs: "",
    itemdesc: "",
    partnum: "",
    regisdate: "",
    effectdate: "",
    requiredqty: 1,
    outs: 1,
    unitprice: null,
    budgetprice: null,
    unit: "",
    supplierprice: "",
    remarks: "",
    customer: "",
    dwg: null,
    bom: null,
    costing: null,
    conversions: [],
  };
  useEffect(() => {
    if (customerList.length < 1 && unitsOption.length < 1) {
      getOptions(setLoading);
    }
  }, []);
  const initialValues = data.id || data.mspecs ? data : defaultValues;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validateItemForm}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        data.id
          ? Confirm(editItem, setSubmitting, values)
          : Confirm(addItem, setSubmitting, values, resetForm);
      }}
    >
      {({
        values,
        isSubmitting,
        handleSubmit,
        handleReset,
        submitCount,
        setFieldValue,
      }) => {
        const onChangeFile = (e) => {
          setFieldValue(e.target.name, e.target.files[0]);
        };

        const onRemoveFile = (name) => {
          setFieldValue([name], null);
        };

        return (
          <Spin spinning={isSubmitting}>
            <Form>
              <Row gutter={16}>
                <Col lg={{ span: 12 }}>
                  <Field
                    component={AntInput}
                    label="Code"
                    name="code"
                    placeholder="Example CODE-00001"
                  />
                  <Field
                    component={AntInput}
                    label="Material specification"
                    name="mspecs"
                  />
                  <Field
                    component={AntInput}
                    label="Item description"
                    name="itemdesc"
                  />
                  <Field component={AntInput} label="Part no." name="partnum" />
                  <Field
                    component={AntDatePicker}
                    value={
                      values.regisdate
                        ? moment(values.regisdate, "YYYY-MM-DD")
                        : null
                    }
                    format="YYYY-MM-DD"
                    submitCount={submitCount}
                    label="Registration date"
                    name="regisdate"
                  />
                  <Field
                    value={
                      values.effectdate
                        ? moment(values.effectdate, "YYYY-MM-DD")
                        : null
                    }
                    format="YYYY-MM-DD"
                    submitCount={submitCount}
                    component={AntDatePicker}
                    label="Effectivity date"
                    name="effectdate"
                  />
                  <Field
                    component={AntSelect}
                    label="Customer"
                    name="customer"
                    value={values.customer.toString()}
                    selectOptions={[
                      {
                        companyname: "None",
                        id: 0,
                      },
                      ...customerList,
                    ]}
                    displayName="companyname"
                    keyName="id"
                    disabled={values.mother ? true : false}
                  />
                </Col>
                <Col lg={{ span: 12 }}>
                  <Field
                    component={AntInputNumber}
                    label="Required qty"
                    name="requiredqty"
                    min={0}
                  />
                  <Field
                    component={AntInputNumber}
                    label="Outs"
                    name="outs"
                    min={0}
                  />

                  <Field
                    component={AntSelect}
                    label="Unit"
                    name="unit"
                    value={values.unit}
                    selectOptions={unitsOption}
                  />

                  <Field
                    component={AntInputNumber}
                    label="Unit price"
                    name="unitprice"
                    min={0}
                  />
                  <Field
                    component={AntInputNumber}
                    label="Budget price"
                    name="budgetprice"
                    min={0}
                  />
                  <Field
                    component={AntInput}
                    label="Supplier &amp; price"
                    name="supplierprice"
                    placeholder="E.g Supplier1 23.2 / Supplier2 21.5"
                  />
                  <Field component={AntInput} label="Remarks" name="remarks" />
                </Col>
              </Row>

              <>
                <Divider orientation="left">Others</Divider>
                <Row gutter={16}>
                  <Col lg={{ span: 12 }}>
                    <FieldArray name="conversions">
                      {({ insert, remove }) => (
                        <div
                          style={{
                            marginTop: 10,
                          }}
                        >
                          <Button
                            onClick={() => insert("")}
                            style={{
                              marginBottom: 20,
                            }}
                          >
                            Add conversion instruction
                          </Button>
                          {values.conversions.length > 0 &&
                            values.conversions.map((_v, i) => (
                              <Row gutter={8}>
                                <Col sm={{ span: 20 }}>
                                  <Field
                                    component={AntSelect}
                                    value={(
                                      values.conversions[i] || ""
                                    ).toString()}
                                    name={`conversions[${i}]`}
                                    selectOptions={conversions}
                                    displayName="conversion"
                                    keyName="id"
                                    placeholder="Select a conversion"
                                  />
                                </Col>
                                <Col sm={{ span: 4 }}>
                                  <Button
                                    onClick={() => remove(i)}
                                    type="danger"
                                    style={{
                                      marginTop: 4,
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                        </div>
                      )}
                    </FieldArray>
                  </Col>
                  <Col lg={{ span: 12 }}>
                    {!values.id && (
                      <Fragment>
                        <FileUpload
                          onChangeFile={onChangeFile}
                          file={values.dwg}
                          onRemoveFile={onRemoveFile}
                          accept="application/pdf"
                          multiple={false}
                          title="Upload dwg"
                          name="dwg"
                        />
                        <FileUpload
                          onChangeFile={onChangeFile}
                          file={values.bom}
                          onRemoveFile={onRemoveFile}
                          accept="application/pdf"
                          multiple={false}
                          title="Upload bom"
                          name="bom"
                        />
                        <FileUpload
                          onChangeFile={onChangeFile}
                          file={values.costing}
                          onRemoveFile={onRemoveFile}
                          accept="application/pdf"
                          multiple={false}
                          title="Upload costing"
                          name="costing"
                        />
                      </Fragment>
                    )}
                  </Col>
                </Row>
              </>
              <div
                className="ant-modal-footer"
                style={{ margin: "20px -20px 0 -20px" }}
              >
                <Button onClick={handleReset}>Reset</Button>
                <Button
                  icon="save"
                  disabled={isSubmitting}
                  type="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Spin>
        );
      }}
    </Formik>
  );
};

export default MasterlistForm;
