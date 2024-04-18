import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
// import Profile from "views/admin/profile";
import Hopers from "./views/admin/Hoppers/Hopers";
// import Billing from "./views/admin/Billing/BillingandAccount";
// import Internalmanagement from "./views/admin/Internalmanagement/Internalmanagement";
import AdminControls from "views/admin/Admincontrols/AdminControls";

// import Onboarding from "./views/admin/Onboarding/Onboarding";
import Content from "./views/admin/Content";
import Chat from "views/admin/Chat/Chat";
import EmployeeRegistration from "views/admin/EmployeeRegistration/EmployeeRegistration";

// Auth Imports
import LiveTasks from "views/admin/LiveTasks/LiveTasks";
import SignIn from "views/auth/SignN/SignN";
import ForgotPassword from "views/auth/ForgotPasswordN/ForgotPasswordN";
// import ResetPassword from "views/auth/resetPassword/index.jsx";
import dashboardic from "../src/assets/img/icons/home.png";
import contentic from "./assets/img/icons/content.png";
import publicationic from "./assets/img/icons/publication.png";
import hopperic from "./assets/img/icons/hopper.png";
import invoicingic from "./assets/img/icons/invoicing.png";
import chatic from "./assets/img/icons/chat.png";
import controlsic from "./assets/img/icons/admincontrols.svg";
import logoutic from "./assets/img/icons/logout.png";
// import AdminReg from "assets/img/icons/AdminReg.svg";
// import Hopperedit from "./views/admin/Hoppers/Hopperedit";
import PublishedContent from "./views/admin/Hoppers/PublishedContent";
import Publications from "./views/admin/Publications/Publications";

import LivePublishdedcontent from "./views/admin/LivePublishdedcontent/LivePublishdedcontent";
import Uploadedcontentlist from "./views/admin/Uploadedcontentlist/Uploadedcontentlist";
import Invoicingandpayments from "./views/admin/Invoicingandpayments/Invoicingandpayments";
import InvoiceTransaction from "./views/admin/InvoiceTransaction/InvoiceTransaction";
import PaymentTransation from "./views/admin/PaymentTransation/PaymentTransation";
import Avatarmanagement from "views/admin/Avatarmanagement/AvatarsN";
import LiveUploadedContent from "views/admin/Content/LiveUploadedContent";
// import Notifications from "views/admin/Notifications/Notifications";
// import ViewNotification from "views/admin/Notifications/ViewNotification";
import notifyic from "assets/img/icons/notification.svg";
import HopperTaskControlHistory from "views/admin/Hoppers/HopperTaskControlHistory";
import HopperControlHistory from "views/admin/Hoppers/HopperControlHistory";
import HopperPublishedContentHistory from "views/admin/Hoppers/HopperPublishedContentHistory";
import HopperUploadedContentHistory from "views/admin/Hoppers/HopperUploadedContentHistory";
import PublishedContentHistory from "views/admin/Hoppers/PublishedContentHistory";
import HopperUploadedContent from "views/admin/Hoppers/HopperUploadedContent";
import UploadedContentHistory from "views/admin/Hoppers/UploadedContentHistory";
import PublicationControlHistory from "views/admin/Publications/PublicationControlHistory";
import PurchasedContentHistory from "views/admin/Publications/PurchasedContentHistory";
// import CategoryManagement from "views/admin/CategoryManagement/CategoryManagement";
import categoryic from "assets/img/icons/category.svg";
import empreg from "assets/img/icons/empreg.svg";
import avatarsic from "assets/img/icons/avatars.svg";
// import generalic from "assets/img/icons/general.svg";
import PurchasedContentful from "views/admin/Publications/PurchasedContentful";
import SourcedContentful from "views/admin/Publications/SourcedContentful";
import AvatarsN from "views/admin/Avatarmanagement/AvatarsN";
import SignN from "views/auth/SignN/SignN";
import ForgotPasswordN from "views/auth/ForgotPasswordN/ForgotPasswordN";
import SourcedContentHistory from './views/admin/Publications/SourcedContentHistory'

import ContentOnboardingHistory from "views/admin/Content/ContentOnboardingHistory";
// import PublishedContenHistory from "views/admin/Content/Published Content Summary";
import ContentPublishedHistory from "views/admin/Content/PublishedContenHistory"
import UploadedContentSummaryHistory from "views/admin/Content/UploadedContentSummaryHistory";
import ManageCategories from "views/admin/CategoryManagement/ManageCategories";
import EditApp from "views/admin/GenralManagement/EditApp";
import EditMarketplace from "views/admin/GenralManagement/EditMarketplace";
import ResetPasswordN from "views/auth/ResetPasswordN/ResetPasswordN";
import sidebareditic from "assets/img/icons/sidebaredit.svg";
import Publishedcontentlist from "views/admin/Publishedcontentlist/Publishedcontentlist";
import Employeemanagehistory from "views/admin/Admincontrols/Employeemanagehistory"
import PurchasedContentfulHistory from "views/admin/Publications/PurchasedContentfulHistory";
import SourcedContentfulHistory from "views/admin/Publications/SourcedContentfulHistory";
import Notification from "views/admin/Notifications/Notification";
import Payments from "views/admin/Payments/Payments";
import paymentic from "assets/img/icons/payments.svg";
import PaymentsHistory from "views/admin/Payments/PaymentsHistory";
import InvoicingHistory from "views/admin/Invoicingandpayments/InvoicingHistory";
import InvoicePaymentHistory from "views/admin/Invoicingandpayments/InvoicePaymentHistory";
import EditEmployee from "views/admin/EmployeeRegistration/EditEmployee";
import SearchedContentlist from "views/admin/SearchedContentlist/SearchedContentlist";
import SubscribedEmail from "components/sidebar/components/SubscribedEmail";
const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    color: "#000",
    icon: <img src={dashboardic} width='20px' height='20px' />,
    component: MainDashboard,
  },
  {
    name: "Manage content",
    layout: "/admin",
    path: "/content",
    icon: (<img src={contentic} width='20px' height='20px' />),
    component: Content,
    secondary: true,
  },
  {
    name: "Manage publications",
    layout: "/admin",
    path: "/publications-management",
    icon: (
      <img
        src={publicationic}
        width='20px'
        height='20px'
        onClick={() => localStorage.setItem("special_navigate", false)}
      />
    ),
    component: Publications,
    secondary: true,
  },
  {
    name: "Manage publications",
    layout: "/admin",
    path: "/publication-control-history/:id/:name/:component",
    component: PublicationControlHistory,
    hide: true,
  },
  {
    name: "Manage publications",
    layout: "/admin",
    path: "/purchased-content-history/:id/:component",
    component: PurchasedContentHistory,
    hide: true,
  },

  // 
  // {
  // name: "Manage content",
  // layout: "/admin",
  // path: "/content-onboarding-history/:id",
  // component: ContentOnboardingHistory,
  // hide: true,
  // },


  {
    name: "Manage hoppers",
    layout: "/admin",
    path: "/hopper-task-contol-history/:id/:name/:component",
    component: HopperTaskControlHistory,
    hide: true,
  },

  {
    name: "Manage hoppers",
    layout: "/admin",
    path: "/hoppers",
    icon: (
      <img
        src={hopperic}
        width='20px'
        height='20px'
        onClick={() => localStorage.setItem("special_navigate", false)}
      />
    ),
    component: Hopers,
    secondary: true,
  },
  {
    name: "Invoicing & payments",
    layout: "/admin",
    path: "/invoicing-and-payments",
    icon: (
      <img
        src={invoicingic}
        width='20px'
        height='20px'
      />
    ),
    component: Invoicingandpayments,
    secondary: true,
  },
  {
    name: "Payment transaction",
    layout: "/admin",
    path: "/Payment-Transaction/:id/:component",
    icon: (
      <Icon as={MdHome} width='20px' height='20px' color='inherit' />
    ),
    component: PaymentTransation,
    hide: true,
  },
  {
    name: "Invoice transaction",
    layout: "/admin",
    path: "/Invoice-Transaction/:id/:component",
    icon: (
      <Icon as={MdHome} width='20px' height='20px' color='inherit' />
    ),
    component: InvoiceTransaction,
    hide: true,
  },
  {
    name: "Invoicing history",
    layout: "/admin",
    path: "/invoice-history/:id/:component",
    icon: (
      <img
        src={invoicingic}
        width='20px'
        height='20px'
      />
    ),
    component: InvoicingHistory,
    hide: true,
  },
  {
    name: " Payments history",
    layout: "/admin",
    path: "/payment-history/:id/:component",
    icon: (
      <img
        src={invoicingic}
        width='20px'
        height='20px'
      />
    ),
    component: InvoicePaymentHistory,
    hide: true,
  },
  {
    name: "Payment process",
    layout: "/admin",
    path: "/payments",
    icon: (
      <img
        src={paymentic}
        width='20px'
        height='20px'
      />
    ),
    component: Payments,
    secondary: true,
  },
  {
    name: "Payments history",
    layout: "/admin",
    path: "/payments-history",
    icon: (
      <img
        src={paymentic}
        width='20px'
        height='20px'
      />
    ),
    component: PaymentsHistory,
    hide: true,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "/chat",
    icon: (
      <img
        src={chatic}
        width='20px'
        height='20px'
        color='inherit'
        onClick={() => localStorage.setItem("special_navigate", false)}
      />
    ),
    component: Chat,
    secondary: true,
  },
  // {
  //   name: "Notifications",
  //   layout: "/admin",
  //   path: "/notifications",
  //   icon: (
  //     <img
  //       src={notifyic}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: Notifications,
  //   secondary: true,
  // },
  {
    name: "Notifications",
    layout: "/admin",
    path: "/notifications",
    icon: (
      <img
        src={notifyic}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Notification,
    secondary: true,
  },
  // {
  //   name: "Notification details",
  //   layout: "/admin",
  //   path: "/notification-detail",
  //   component: ViewNotification,
  //   hide: true,
  // },
  {
    name: "Content purchased online",
    layout: "/admin",
    path: "/publication-purchased-content-detail/:id/:component",
    component: PurchasedContentful,
    hide: true,
  },
  {
    name: "Content purchased online history",
    layout: "/admin",
    path: "/publication-purchased-content-detail-history/:id/:component",
    component: PurchasedContentfulHistory,
    hide: true,
  },
  {
    name: "Content sourced from tasks",
    layout: "/admin",
    path: "/publication-sourced-content-detail/:task_id/:component",
    component: SourcedContentful,
    hide: true,
  },
  {
    name: "Content sourced from tasks",
    layout: "/admin",
    path: "/publication-sourced-content-detail-history/:id",
    component: SourcedContentfulHistory,
    hide: true,
  },
  {
    name: "Manage publications",
    layout: "/admin",
    path: "/sorced-content-summary-history/:id/:component",
    component: SourcedContentHistory,
    hide: true,
  },
  {
    name: "Manage tabs / categories",
    layout: "/admin",
    path: "/category-management",
    icon: (
      <img src={categoryic} width='20px' height='20px' color='inherit' />
    ),
    component: ManageCategories,
  },
  {
    name: "Edit app",
    layout: "/admin",
    path: "/app-cms",
    icon: (
      <img src={sidebareditic} width='20px' height='20px' />
    ),
    component: EditApp,
  },
  {
    name: "Edit marketplace",
    layout: "/admin",
    path: "/edit-marketplace",
    component: EditMarketplace,
    hide: true,
  },
  {
    name: "Admin controls",
    layout: "/admin",
    path: "/admin-controls",
    icon: (
      <img
        src={controlsic}
        width='20px'
        height='20px'
      />
    ),
    component: AdminControls,
    secondary: true,
  },

  {
    name: "New employee registration",
    layout: "/admin",
    path: "/employee-Registration",
    icon: (
      <img
        src={empreg}
        width='20px'
        height='20px'
      />
    ),
    component: EmployeeRegistration,
    secondary: true,
  },
  {
    name: "Edit employee",
    layout: "/admin",
    path: "/edit-employee",
    icon: (
      <img
        src={empreg}
        width='20px'
        height='20px'
      />
    ),
    component: EditEmployee,
    hide: true,
  },
  {
    name: "Avatars",
    layout: "/admin",
    path: "/manage-avatars",
    icon: (
      <img
        src={avatarsic}
        width='20px'
        height='20px'
      />
    ),
    component: AvatarsN,
    secondary: true,
  },
  {
    name: "Subscribed Email",
    layout: "/admin",
    path: "/SubscribedEmail",
    icon: (
      <img
        src={avatarsic}
        width='20px'
        height='20px'
      />
    ),
    component: SubscribedEmail,
    secondary: true,
  },
  // {
  //     name: "Subscribed Emails",
  //     layout: "/admin",
  //     path: "/subscribes-emails",
  //     icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //     component: SubscribedEmail,
  //     // hide: true
  //     secondary: true,
    
  //   },
  // {
  //   name: "Subscribed Emails",
  //   layout: "/admin",
  //   path: "/subscribes-emails",
  //   icon: (
  //     <img
  //       src={avatarsic}
  //       width='20px'
  //       height='20px'
  //     />
  //   ),
  //   component: SubscribedEmail,
  //   secondary: true,
  // },
 
  {
    name: "Signin",
    layout: "/auth",
    path: "/sign-in",
    component: SignIn,
    hide: true
  },
  {
    name: "Reset password",
    layout: "/auth",
    // path: "/reset-password/:id",
    path: "/reset-password",

    // component: ResetPassword,
    component: ResetPasswordN,
    hide: true
  },
  {
    name: "Forgot password",
    layout: "/auth",
    path: "/forgot-password",
    component: ForgotPassword,
    hide: true
  },
  {
    name: "Published content",
    layout: "/admin",
    path: "/published-content/:id/:component",
    component: PublishedContent,
    hide: true,
  },
  {
    name: "Published content",
    layout: "/admin",
    path: "/published-content-history/:id/:component",
    component: PublishedContentHistory,
    hide: true,
  },
  {
    name: "Uploaded content",
    layout: "/admin",
    // path: "/uploaded-content/:id/:task_id",
    path: "/hopper-uploaded-content/:task_id/:hopper_id/:component",
    component: HopperUploadedContent,
    hide: true,
  },
  {
    name: "Uploaded content",
    layout: "/admin",
    path: "/uploaded-content-history/:id/:component",
    component: UploadedContentHistory,
    hide: true,
  },
  {
    name: "Live published content",
    layout: "/admin",
    path: "/live-published-content/:id/:component/:page?",
    component: LivePublishdedcontent,
    hide: true,
  },
  {
    name: "Live uploaded content",
    layout: "/admin",
    path: "/live-uploaded-content/:hopperId/:taskId/:component",
    component: LiveUploadedContent,
    hide: true,
  },
  {
    name: "Tasks",
    layout: "/admin",
    path: "/live-tasks/:id/:component",
    component: LiveTasks,
    hide: true,
  },
  {
    name: "Live uploaded content",
    layout: "/admin",
    path: "/uploaded-content-list",
    component: Uploadedcontentlist,
    hide: true,
  },
  {
    name: "Live published content",
    layout: "/admin",
    path: "/published-content-list",
    component: Publishedcontentlist,
    hide: true,
  },
  {
    name: "Task control history",
    layout: "/admin",
    path: "/hopper-task-control-history",
    component: HopperTaskControlHistory,
    hide: true,
  },
  {
    name: "Hopper control history",
    layout: "/admin",
    path: "/hopper-control-history/:id/:component",
    component: HopperControlHistory,
    hide: true,
  },
  {
    name: "Hopper published content history",
    layout: "/admin",
    path: "/hopper-published-content-history/:id/:component",
    component: HopperPublishedContentHistory,
    hide: true,
  },
  {
    name: "Hopper uploaded content history",
    layout: "/admin",
    path: "/hopper-uploaded-content-history/:id/:component",
    component: HopperUploadedContentHistory,
    hide: true,
  },

  {
    name: "Manage content",
    layout: "/admin",
    path: "/content-onboarding-history/:id/:name/:component",
    component: ContentOnboardingHistory,
    hide: true,
  },
  {
    name: "Manage content",
    layout: "/admin",
    path: "/content-published-history/:id/:name/:component",
    component: ContentPublishedHistory,
    hide: true,
  },
  {
    name: "Manage content",
    layout: "/admin",
    path: "/content-uploaded-summary-history/:id/:name/:component",
    component: UploadedContentSummaryHistory,
    hide: true,
  },
  {
    name: "Searched content",
    layout: "/admin",
    path: "/searched-content-list/:id/:component",
    component: SearchedContentlist,
    hide: true,
  },
  {
    name: "Reset password",
    layout: "/auth",
    path: "/reset-password-n",
    component: ResetPasswordN,
    hide: true,
  },
  // {
  //   // name: "Admin controls",
  //   layout: "/admin",
  //   path: "/employee-manage-history/:id",
  //   component: Employeemanagehistory,
  //   hide: true,
  // },
  {
    // name: "Admin controls",
    layout: "/admin",
    path: "/employee-manage-history/:id/:component",
    component: Employeemanagehistory,
    hide: true,
  }

];

// {
//   name: "Subscribed Emails",
//   layout: "/admin",
//   path: "/subscribes-emails",
//   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
//   component: SubscribedEmail,
//   // hide: true
//   secondary: true,

// },

export const Logout = [
  {
    name: "Log out",
    layout: "/auth",
    path: "/sign-out",
    color: "#000",
    fontFamily: "AirbnbMedium",
    icon: (
      <img src={logoutic} width='20px' height='20px' />
    ),
    component: SignIn,
  }
];
export default routes;
