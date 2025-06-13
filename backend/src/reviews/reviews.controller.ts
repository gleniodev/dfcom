import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('products/:productId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Param('productId') productId: string, @Body() createReviewDto: any) {
    return this.reviewsService.create(productId, createReviewDto);
  }

  @Get()
  findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Get('/average')
  getAverageRating(@Param('productId') productId: string) {
    return this.reviewsService.getAverageRating(productId).then((average) => {
      return { averageRating: average };
    });
  }

  @Put('/:reviewId')
  update(@Param('reviewId') reviewId: string, @Body() updateReviewDto: any) {
    return this.reviewsService.update(reviewId, updateReviewDto);
  }

  @Delete('/:reviewId')
  remove(@Param('reviewId') reviewId: string) {
    return this.reviewsService.remove(reviewId);
  }
}
