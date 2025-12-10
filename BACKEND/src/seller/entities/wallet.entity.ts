// src/seller/entities/wallet.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Seller } from './seller.entity';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  balance: number;

  // One-to-One relation with Seller
  @OneToOne(() => Seller, (seller) => seller.wallet, { onDelete: 'CASCADE' })
  @JoinColumn()
  seller: Seller;

  @Column('uuid')
  sellerId: string;
}