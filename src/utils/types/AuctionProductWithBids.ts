import { Prisma } from '@prisma/client';

const auctionProductWithBids: any = Prisma.validator<Prisma.AuctionProductArgs>()({
    include: { bids: true },
});

export type AuctionProductWithBids = Prisma.AuctionProductGetPayload<typeof auctionProductWithBids>;
