/**
 * Role-Based Access Control (RBAC) Middleware
 * @param {...string} allowedRoles 
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        success: false,
        message: "Authorization failed. User context is missing (Make sure verifyToken is called first).",
      });
    }
    const hasPermission = allowedRoles.includes(req.user.role);

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Your role '${req.user.role}' is not authorized to access this resource.`,
      });
    }
    next();
  };
};