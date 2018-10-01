import { ACCESS_TOKEN_KEY } from "../constants";
const bearer = () => `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`;

export const testAuth = () => {
  return fetch("/api/auth", {
    headers: {
      Accept: "application/json",
      Authorization: bearer(),
    },
  }).then(res => {
    return res.ok;
  });
};

export const login = (credentials) => {
  return fetch("/api/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then(res => {
    if (res.ok) {
      return res.json().then(parsed => {
        localStorage.setItem(ACCESS_TOKEN_KEY, parsed.token);
        return res.ok; // true at this point
      });
    }
    return res.ok; // false at this point
  });
};

export const postSubscription = (subscription) => 
  fetch("/api/subscriptions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer(),
    },
    body: JSON.stringify(subscription),
  }).then(res =>
    res.json().then(parsed => ({
        ok: res.ok,
        result: parsed,
      })
  ));

export const getSubscriptions = () => {
  return fetch("/api/subscriptions", {
    headers: {
      Accept: "application/json",
      Authorization: bearer(),
    },
  }).then(res => {
    return res.ok ? res.json().then(subs => subs) : [];
  });
};
