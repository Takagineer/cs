// import React, { Component, useContext } from 'react'
// import { AuthContext } from '../../auth/AuthProvider';
// import Login from './Login';

// export default function PrivateRoute({ component: RouteComponent, ...options }) {
//   const { currentUser } = useContext(AuthContext);
//   const Component = currentUser ? RouteComponent : Login
//   return (
//     <>
//       < Route {...options} component={Conponent} />
//     </>
//   )
// }

//ここでは理屈（？）の記述をしている。
// AuthProviderコンポーネントにて、ロジックを記述していたが、このコンポーネントでは
//AuthProviderコンポーネントを基に、実際のページ遷移を記述している。

