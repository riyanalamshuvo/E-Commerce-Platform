// src/seller/entities/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seller } from './seller.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  imageUrl?: string;

  // Relation: একটা প্রোডাক্টের একটা সেলার
  @ManyToOne(() => Seller, (seller) => seller.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sellerId' })
  seller: Seller;

  @Column('uuid')
  sellerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}