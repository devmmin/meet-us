import { SecurityContext } from '@auth/security/security-context';
declare global {
  namespace Express {
    interface Request {
      securityContext?: SecurityContext | undefined;
    }
  }
}

import express = require('express');
