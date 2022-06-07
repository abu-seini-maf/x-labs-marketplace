import SanityClient from "@sanity/client";

export const client = SanityClient({
    projectId: '5dwhkpa6',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false,
    token: 'skjA40vs5QCvPj08VSjmgavqt961zT7fKRRA8IxjpyDBZcmV8GhvDjOMqVySmKbDu8oTCJLgeQ4i3B2SSpjSjdUi3tPvmtT80DoNBV2lpviEHatwwmReNDfk629nO56yIxkPwm92LCqsDxKJCMSz1ZS5Xx3eiEEPkGKHNxLOOhs7EyCWsAhl'
})