import { Module as IModule } from '../../core/module.client';
import { MODULE_METADATA } from '../shared/constant/metadata.constant';

export function Module(metadata: IModule): ClassDecorator {
  return (target: object) => {
    Reflect.defineProperty(target, MODULE_METADATA.IMPORTS, metadata.imports);
    Reflect.defineProperty(
      target,
      MODULE_METADATA.COMPONENTS,
      metadata.components,
    );
    Reflect.defineProperty(
      target,
      MODULE_METADATA.CONTROLLERS,
      metadata.controllers,
    );
    Reflect.defineProperty(target, MODULE_METADATA.EXPORTS, metadata.exports);
  };
}
