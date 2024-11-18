export enum BadRequestMessage {
  InValidLoginData = 'اطلاعات ارسال شده برای ورود صحیح نمی باشد',
  InValidRegisterData = 'اطلاعات ارسال شده برای ثبت نام صحیح نمی باشد',
  SomethingWrong = 'خطایی پیش آمده',
  InvalidCategories = 'دسته بندی وارد شده صحیح نمی باشد',
}
export enum AuthMessage {
  TryAgain = 'دوباره تلاش کنید',
  // TODO: change to AlreadyExist
  ExpiredCode = 'کد تایید منقضی شده است',
  LoginAgain = 'مجدد وارد حساب کاربری خود شوید',
  LoginIsRequired = 'وارد حساب کاربری خود شوید',
  ClinicLogin = 'برای دسترسی به این بخش باید با حساب کاربری کلینیک وارد شوید',
  UserLogin = 'برای دسترسی به این بخش باید به صورت کاربر معمولی وارد شوید',
}

export enum NotFoundMessage {
  UserNotFount = 'کاربر پیدا نشد',
  ClinicNotFount = 'کلینک پیدا نشد',
  CategoryNotFount = 'دسته بندی پیدا نشد',
  PlanNotFound = 'برنامه ای پیدا نشد',
  TransacionNotFound = 'تراکنش پیدا نشد',
}
export enum ValidationMessage {
  InvalidPhoneForamt = 'فرمت شماره موبایل وارد شده قابل قبول نیست',
  InvalidImageForamt = 'فرمت تصویر وارد شده قابل قبول نیست',
}
export enum PublicMessage {
  SendOtp = 'کد یکبار مصرف ارسال شد',
  LoggedIn = 'با موفقیت وارد حساب کاربری خود شدید',
  Created = 'با موفقیت ایجاد شد',
  Updated = 'به روز رسانی شد',
  Deleted = 'با موفقیت حذف شد',
  NotAlloweded = 'شما مجاز به انجام این عملیات نیستید',
}
