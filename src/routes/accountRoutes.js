const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const accountController = require('../controllers/accountController');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/authenticate', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/revoke-token', authController.revokeToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/validate-reset-token', authController.validateResetToken);
router.post('/reset-password', authController.resetPassword);

// Protected routes (Admin only)
router.get('/', authenticate, authorize('Admin'), accountController.getAccounts);
router.post('/', authenticate, authorize('Admin'), accountController.createAccount);
router.get('/:id', authenticate, accountController.getAccountById);
router.put('/:id', authenticate, accountController.updateAccount);
router.delete('/:id', authenticate, accountController.deleteAccount);

module.exports = router;