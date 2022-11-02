import { TransactionBaseService } from '@medusajs/medusa';

class PostService extends TransactionBaseService {
  constructor({ postRepository, manager }) {
    super({ postRepository, manager });

    this.postRepository = postRepository;
    this.manager_ = manager;
  }

  async create(name) {
    const postRepository = this.manager_.getCustomRepository(
      this.postRepository
    );
    const post = await postRepository.create({ name: name });
    return await postRepository.save(post);
  }

  async list() {
    const postRepository = this.manager_.getCustomRepository(
      this.postRepository
    );
    return await postRepository.find();
  }
}

export default PostService;