import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import 'animate.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import UtilsContext from './context/UtilsContext';
import MasterlistContext from './context/MasterlistContext';
import Login from './views/Login';
import HomeView from './views/HomeView';
import Error from './error/Error';
import Loader from './components/Loader/Loader';
import './App.css';

import { routes } from './config/config';

library.add(fab, fas);

function App() {
	return (
		<Router>
			<Switch>
				<Suspense fallback={<Loader />}>
					<UtilsContext>
						<MasterlistContext>
							<Switch>
								<Route path="/" render={(prop) => <Login {...prop} />} exact />
								<Route
									path="/masterlist"
									render={(prop) => <HomeView {...prop} />}
								/>
								{routes.map((data, i) => {
									return (
										<Route
											key={i}
											path={data.path}
											render={(prop) => (
												<data.component {...prop} title={data.title} />
											)}
										/>
									);
								})}
								<Route render={(prop) => <Error {...prop} />} />
							</Switch>
						</MasterlistContext>
					</UtilsContext>
				</Suspense>
			</Switch>
		</Router>
	);
}

export default App;
