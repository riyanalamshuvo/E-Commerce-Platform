import { Entity, PrimaryGeneratedColumn,OneToOne, OneToMany, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from './product.entity';
import { Wallet } from './wallet.entity';

export enum SellerStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    BLOCKED = 'BLOCKED'
}


@Entity('sellers')
export class Seller {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    shopName?: string;

    @Column({ nullable: true, unique: true })
    shopSlug?: string;

    @Column({ type: 'enum', enum: SellerStatus, default: SellerStatus.PENDING })
    status: SellerStatus;

    @Column({ nullable: true })
    rejectedReason?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @OneToMany(() => Product, (product) => product.seller)
    products: Product[];


    @OneToOne(() => Wallet, (wallet) => wallet.seller)
wallet: Wallet;

}