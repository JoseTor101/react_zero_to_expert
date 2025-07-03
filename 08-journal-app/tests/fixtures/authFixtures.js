export const initialState = {
    status: "checking",
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: "authenticated",
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoUrl: 'https://demo.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: "not-authenticated",
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
};

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoUrl: 'https://demo.jpg',
}