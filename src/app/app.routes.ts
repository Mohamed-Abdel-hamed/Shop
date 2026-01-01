import { Routes } from '@angular/router';
import { Register } from './components/auth/register/register';
import { Home } from './components/home/home';
import { PublicLayout } from './components/layouts/public-layout/public-layout';
import { Login } from './components/auth/login/login';
import { EmailConfirmation } from './components/auth/email-confirmation/email-confirmation';
import { authGuard } from './guards/auth-guard';
import { Profile } from './components/profile/profile';
import { Updateaccount } from './components/auth/updateaccount/updateaccount';
import { ProfileInfo } from './components/profile-info/profile-info';
import { ChangePassword } from './components/auth/change-password/change-password';
import { ForgetPassword } from './components/auth/forget-password/forget-password';
import { ResetPassword } from './components/auth/reset-password/reset-password';
import { Addorder } from './components/order/addorder/addorder';
import { Confirmorder } from './components/order/confirmorder/confirmorder';
import { Adminlayout } from './components/layouts/adminlayout/adminlayout';
import { Addproduct } from './components/admin/product/addproduct/addproduct';
import { Products} from './components/admin/product/products/products';
import { Updateproduct } from './components/admin/product/updateproduct/updateproduct';
import { Details } from './components/Product/details/details';
import { Orders } from './components/admin/orders/orders';
import { customerGuard } from './guards/customer-guard';
import { adminGuard } from './guards/admin-guard';
import { NewArrivales } from './components/new-arrivales/new-arrivales';
import { OnSale } from './components/on-sale/on-sale';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { Categories } from './components/admin/category/categories/categories';
import { Addcategory } from './components/admin/category/addcategory/addcategory';
import { Updatecategory } from './components/admin/category/updatecategory/updatecategory';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
  {path:'',component:PublicLayout,children:[
      {path:'home',component:Home},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
          {path:'new-arrivales',component:NewArrivales},
                  {
  path: 'product/:id',
  component:Details
},
    {path:'onsale',component:OnSale},
      {
        path: 'profile',
        component: Profile,
        children: [
          { path: 'me', component: ProfileInfo },
          { path: 'updateaccount', component: Updateaccount },
          { path: 'change-password', component: ChangePassword }
        ],
         canActivate: [authGuard,customerGuard],
      }

    ],
  },

  {path:'register',component:Register},
    {path:'login',component:Login,canActivate:[loginGuard]},
    {path:'auth/forgetPassword',component:ForgetPassword},
    {path:'auth/resetPassword',component:ResetPassword},
    { path: 'auth/emailConfirmation', component: EmailConfirmation },
    {path:'cart',
       loadComponent: () => import('./components/cart/cart').then(m => m.Cart), canActivate: [authGuard,customerGuard]},
     {path:'add-order',component:Addorder, canActivate: [authGuard,customerGuard]},
      {path:'order/confirmorder',component:Confirmorder, canActivate: [authGuard,customerGuard]},

      //////////////////////////////////////////////////////////////

      {path:'admin',component:Adminlayout,children:[
        {path:'orders',component:Orders},
          {path:'dashboard',component:Dashboard},
            {path:'',pathMatch:'full',redirectTo:'dashboard'},
        {path:'categories',component:Categories},
        {path:'categories/add',component:Addcategory},
        {path:'categories/edit/:id',component:Updatecategory},
        {path:'products',component:Products},
        {path:'add-product',component:Addproduct},
        {
  path: 'edit/:id',
  component: Updateproduct
},
{
        path: 'profile',
        component: Profile,
        children: [
          { path: 'me', component: ProfileInfo },
          { path: 'updateaccount', component: Updateaccount },
          { path: 'change-password', component: ChangePassword }
        ]
      }
      ], canActivate: [authGuard,adminGuard]},

];
