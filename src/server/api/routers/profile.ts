import { createTRPCRouter, privateProcedure } from '../trpc';

export const profileRouter = createTRPCRouter({
	getProfile: privateProcedure.query(async ({ ctx }) => {
		const { db, user } = ctx;

		const profile = db.profile.findUnique({
			where: { userId: user?.id },
			select: {
				username: true,
				fullName: true,
				bio: true,
				profilePicture: true,
			},
		});

		return profile;
	}),
});
