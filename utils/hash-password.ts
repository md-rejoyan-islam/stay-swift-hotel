import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
  return hashedPassword;
}

export async function verifyPassword(
  enteredPassword: string,
  storedPasswordHash: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(enteredPassword, storedPasswordHash);
  return isValid;
}
