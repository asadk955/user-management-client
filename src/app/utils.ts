export default class Utils {
  static getError(errors: any, field: String): String {
    return errors?.find((item: any) => item.field == field)?.errorMessage;
  }
}
