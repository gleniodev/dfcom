import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(productId: string, createReviewDto: any): Promise<Review> {
    const review = new this.reviewModel({ ...createReviewDto, productId });
    return review.save();
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }

  async findOne(reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findById(reviewId).exec();
    if (!review) {
      throw new NotFoundException(`Review com id ${reviewId} não encontrada`);
    }
    return review;
  }

  async update(reviewId: string, updateReviewDto: any): Promise<Review> {
    const review = await this.reviewModel
      .findByIdAndUpdate(reviewId, updateReviewDto, { new: true })
      .exec();
    if (!review) {
      throw new NotFoundException(`Review com id ${reviewId} não encontrada`);
    }
    return review;
  }

  async remove(reviewId: string): Promise<void> {
    const result = await this.reviewModel.deleteOne({ _id: reviewId }).exec();

    // Se não deletou nada → lança 404
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Review com id ${reviewId} não encontrada`);
    }
  }

  async getAverageRating(productId: string): Promise<number> {
    const result = await this.reviewModel.aggregate([
      { $match: { productId: new Types.ObjectId(productId) } },
      { $group: { _id: '$productId', averageRating: { $avg: '$rating' } } },
    ]);

    // Se não houver reviews, retorna 0
    return result[0]?.averageRating ?? 0;
  }
}
