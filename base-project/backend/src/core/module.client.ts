import { Constructor } from "../common/types";

export interface IModule {
  imports: Array<IModule>;
  controllers: Array<Constructor>;
  components: Array<Constructor>;
  exports: Array<Constructor>;
}
