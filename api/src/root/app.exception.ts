/**
 * Une petite classe qui va étendre de notre nouvelle exception.
 * Le constructeur de cette classe va simplement transmettre le code de réponse ainsi que le code statu HTTP de retour (200 étant le retour ok)
 * Voici d’ailleurs un lien vers les codes HTTP
 * https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
 */
import { ApiException } from '@common/api/exceptions/api.exception';
import { ApiCodeResponse } from '@common/api';

export class TestException extends ApiException {
  constructor() {
    super(ApiCodeResponse.TEST, 200);
  }
}