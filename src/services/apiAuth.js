import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  // 1. Update user data without Avatar
  let updateUserData;
  if (password) updateUserData = { password };
  if (fullName) updateUserData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateUserData);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;
// 2. Upload Avatar File to Supabase Storage
  const avatarFileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(avatarFileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }
// 3. Update user data with Avatar
  const { data: updateUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updateUser;
}
