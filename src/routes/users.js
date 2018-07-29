const router = require('express').Router();

const services = require('../users/services');
const validations = require('../middlewears/validations');

router.get('/', services.listUsers);

router.post('/',
  validations.validateRegisterUser,
  services.createUser
);

router.get('/:userId',
  validations.validateGetUser,
  services.getUser
);

router.delete('/:userId',
  validations.validateRemoveUser,
  services.removeUser
);

router.patch('/:userId',
  validations.validateUpdateUser,
  services.updateUser
);

module.exports = router;

