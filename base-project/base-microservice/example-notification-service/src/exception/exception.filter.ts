import { Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private static logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: Error) {
    AllExceptionsFilter.logger.error(exception.message);
    AllExceptionsFilter.logger.error(exception.stack);
  }
}
