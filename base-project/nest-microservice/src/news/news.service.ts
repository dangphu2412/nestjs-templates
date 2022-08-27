import { NewsService } from './clients/news.service';
import { News } from './proto/news.grpc';

export class NewsServiceImpl implements NewsService {
  findAll(): News {
    return {
      data: [],
    };
  }
}
