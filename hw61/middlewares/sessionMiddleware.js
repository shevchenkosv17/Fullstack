const sessions = new Map();

export const sessionManager = (req, res, next) => {
  const sessionId = req.headers['x-session-id'] || 'default-session';

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { createdAt: Date.now(), visits: 1 });
  } else {
    const currentSession = sessions.get(sessionId);
    currentSession.visits += 1;
  }

  req.session = sessions.get(sessionId);
  next();
};
