import { UnexpedctedError } from "@/domain/errors";
import { SetStorage } from "@/data/protocols/cache/local-storage";
import { SaveAccessToken } from "@/domain/useCases/save-access-token";

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async save(accessToken: string): Promise<void> {
    if (!accessToken) {
      throw new UnexpedctedError();
    }
    this.setStorage.set("accessToken", accessToken);
  }
}
