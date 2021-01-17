/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-return,
@typescript-eslint/no-unsafe-assignment */

export default (name: 'BASE_URL'): string => {
  const appName = `VUE_APP_${name}`;
  const value = process.env[appName];

  if (!value) {
    throw new Error(`Missing: process.env['${appName}'].`);
  }

  return value;
};
