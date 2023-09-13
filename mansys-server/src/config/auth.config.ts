export const jwtConfig = {
  secret: `${process.env.SECRETKEY}`,
  saltOrRounds: Number(process.env.SALT),
};
