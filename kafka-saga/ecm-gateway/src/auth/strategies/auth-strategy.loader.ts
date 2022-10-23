import { Logger } from '@nestjs/common';
import { AuthStrategy } from '../clients';
import { Constructor } from '../../core/client/util.type';

export const IdMapToStrategy: Record<string, AuthStrategy> = {};

/**
 * @param identify the key which help authorization module identify strategy out of the box
 * @param strategy the authorization strategy use to authorize
 * and can interact with nestjs module out of the box
 */
export function loadAuthStrategy(
  identify: Constructor,
  strategy: AuthStrategy,
) {
  Logger.log(`Initializing strategy ${identify.name}`, 'AuthorizationStrategy');

  IdMapToStrategy[identify.name] = strategy;
}
