import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { credentialPkGenerator } from '@common/config';
import { Exclude } from 'class-transformer';

@Entity()
export class Credential {
  @PrimaryColumn('varchar', {
    name: 'credential_id',
    length: 255,
    default: () => `'${credentialPkGenerator()}'`,
  })
  credential_id: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'facebook_hash', nullable: true, unique: false })
  facebookHash: string;

  @Column({ name: 'google_hash', nullable: true, unique: false })
  googleHash: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'is_active', default: true })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, default: new Date() })
  updatedAt: Date;
}
