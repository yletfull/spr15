const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');

const SECRET_KEY = 'YOUR_QIWI_SECRET_KEY';
const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);

const COMMENT_TO_MATCH = 'TEST_PAYMENT'; // комментарий для сравнения
const checkPay = (req, res, next) => {
  qiwi.getBalance().then(response => {
    qiwiApi.getPayments({ rows: 10 })
      .then((result) => {
        const payments = result.data;
        const filteredPayments = payments.filter((payment) => payment.comment === COMMENT_TO_MATCH);
        console.log(`Found ${filteredPayments.length} payments with comment '${COMMENT_TO_MATCH}'`);
        filteredPayments.forEach((payment) => {
          console.log(`Payment ${payment.billId} of ${payment.sum.amount} ${payment.sum.currency}`);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }).catch(error => {
    res.status(500).send('Error getting balance');
    next(err)
  });
}

module.exports = {
  getUsersList,
  getUser,
  register,
  updateUser,
  updateAvatar,
  login,
  checkPay,
};
