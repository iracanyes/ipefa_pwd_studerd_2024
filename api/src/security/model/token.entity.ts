/**
 *
 */
import { PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { credentialPkGenerator } from '@common/config';
import { Credential } from './credential.entity';

export class Token {
  @PrimaryColumn('varchar', {
    length: 40,
    default: () => `'${credentialPkGenerator()}`,
  })
  token_id: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @OneToOne(() => Credential, { eager: true })
  @JoinColumn({ name: 'credential_id' })
  credential: Credential;
}
