/**
 *
 */
import { PrimaryColumn, Column, OneToOne, JoinColumn, Entity } from 'typeorm';
import { tokenPkGenerator } from '@common/config';
import { Credential } from './credential.entity';

@Entity()
export class Token {
  @PrimaryColumn('varchar', {
    length: 40,
    default: () => `'${tokenPkGenerator()}'`,
  })
  token_id: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @OneToOne(() => Credential, {
    eager: true,
  })
  @JoinColumn({
    name: 'credential_id_fk',
    referencedColumnName: 'credential_id',
  })
  credential: Credential;
}
