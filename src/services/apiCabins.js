import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Failed to fetch Cabins");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete Cabin");
  }
}

export async function createEditCabin(newCabin, id) {
  // https://jooncyildxalxxyppwkk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  
  let query = supabase.from("cabins");
  // A) If it's Not an edit session
  // Create New Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) If it's an edit session
  // Update Existing Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Failed to Create Cabin");
  }
  // 2. Uploading the image to the storage
  if (hasImage) return data;
  
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3.Deleting Cabin If There was an Error while uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    // Handle error
    throw new Error("Failed to Upload Image");
  }

  return data;
}
