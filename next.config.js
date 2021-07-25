const debug = process.env.NODE_ENV !== 'production';
const name = 'momo-SNS';

module.exports = {
  assetPrefix: !debug ? `/${name}/` : '',
};
