import { SaveAccessToken } from "@/domain/useCases";
import { LocalSaveAccessToken } from "@/data/useCases/save-access-token/local-save-access-token";
import { makeLocalStorageAdapter } from "../../cache/local-storage-factory";

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
