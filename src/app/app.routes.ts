import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { authGuard } from './core/auth.guard';
import { SpecialSideNavComponent } from './pages/special-side-nav/special-side-nav.component';
import { CommonQuestionsComponent } from './pages/common-questions/common-questions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsPolicyComponent } from './pages/terms-policy/terms-policy.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LocationComponent } from './pages/location/location.component';
import { LocationDetailsComponent } from './pages/location/location/location-details/location-details.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { SpecialOrderDetailsComponent } from './pages/special-order-details/special-order-details.component';
import { SpecialOrderDataInformationComponent } from './pages/special-order-details/components/special-order-data-information/special-order-data-information.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forget_password', component: ForgetPasswordComponent },
      { path: 'reset_password', component: ResetPasswordComponent },
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    // canActivate: [authGuard], // Applying authGuard to the home layout
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'services/list', component: ServicesSectionComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/:id', component: OrderDetailsComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'reservation/:id', component: ReservationComponent , canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent , canActivate: [authGuard] },
      { path: 'location', component: LocationComponent , canActivate: [authGuard] },
      { path: 'location/:id', component: LocationDetailsComponent , canActivate: [authGuard] },
      { path: 'location/add', component: LocationDetailsComponent , canActivate: [authGuard] },
      { path: 'special_order_details/:id', component: SpecialOrderDetailsComponent , canActivate: [authGuard] },
      { path: 'special_order_details/information/:id', component: SpecialOrderDataInformationComponent , canActivate: [authGuard] },
      { path: 'sp', component: SpecialSideNavComponent,
        children:[
          {
            path:'',redirectTo:'privacy',pathMatch:'full'
          },
          {
            path:'privacy',component:PrivacyPolicyComponent
          },
          {
            path:'terms',component:TermsPolicyComponent
          },
          {
            path:'about',component:AboutUsComponent
          },
          {
            path:'common',component:CommonQuestionsComponent
          }
        ]
       },
    ]
  }
];
