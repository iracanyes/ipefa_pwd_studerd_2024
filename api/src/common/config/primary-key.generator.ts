import { monotonicFactory } from 'ulid';

// Module: Test
export const accountPkGenerator = monotonicFactory();
export const personPkGenerator = monotonicFactory();
export const addressPkGenerator = monotonicFactory();
export const carPkGenerator = monotonicFactory();

// Module: Security
export const credentialPkGenerator = monotonicFactory();
export const tokenPkGenerator = monotonicFactory();

// Module : Member
export const memberPkGenerator = monotonicFactory();
export const memberPlanPkGenerator = monotonicFactory();
export const memberSubscriptionPkGenerator = monotonicFactory();
