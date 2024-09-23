ALTER TABLE "authenticator" DROP CONSTRAINT authenticator_userId_credentialID_pk;
--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT authenticator_userId_credentialID_pk PRIMARY KEY(credentialID,userId);