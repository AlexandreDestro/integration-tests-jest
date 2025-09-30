import { spec } from 'pactum';
import { Character } from '../types/character';
import { BASE_URL } from '../config/apiConfig';

describe('Teste dos Endpoints de Batalha', () => {

  

  describe('Testes dos Endpoints de Personagens', () => {
    describe('GET /characters/example', () => {
      it('Deve retornar um personagem de exemplo', async () => {
        const exampleCharacter: Character = {
          name: 'Kaya',
          strength: 10,
          dexterity: 7,
          hitPoints: 11,
          armorClass: 12
        };
  
        await spec()
          .get(`${BASE_URL}/characters/example`)
          .expectStatus(200)
          .expectJsonMatch(exampleCharacter);
      });
  
      it('Deve retornar 405 para um método não permitido', async () => {
        await spec().post(`${BASE_URL}/characters/example`).expectStatus(405);
      });
    });
  });
});


describe('Testes dos Endpoints de Batalha', () => {

  describe('POST /battle/:monster', () => {

    it('Deve retornar 400 para personagem inválido', async () => {
      const invalidCharacter = {
        name: 'InvalidCharacter',
        strength: 15,
        dexterity: 14,
        hitPoints: 0,
        armorClass: 16
      };

      await spec()
        .post(`${BASE_URL}/battle/goblin`)
        .withJson(invalidCharacter)
        .expectStatus(400);
    });

    it('Deve retornar 405 para método não permitido (GET)', async () => {
      const someCharacter: Character = {
        name: 'Legolas',
        strength: 18,
        dexterity: 20,
        hitPoints: 35,
        armorClass: 15
      };

      await spec()
        .get(`${BASE_URL}/battle/goblin`)
        .withJson(someCharacter)
        .expectStatus(405);
    });
  });

});

describe('Testes dos Endpoints de Monstros', () => {
  describe('GET /monsters/names/:page', () => {
    it('Deve retornar uma lista de nomes de monstros da página 1', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/names/1`)
        .expectStatus(200)
        .expectJsonLike(['Aboleth']);
    });

    it('Deve retornar 500 para uma página inexistente', async () => {
      await spec().get(`${BASE_URL}/monsters/names/999`).expectStatus(500);
    });
  });



describe('Testes dos Endpoints de Monstros', () => {

  describe('GET /monsters/names/:page', () => {
    it('Deve retornar uma lista de nomes de monstros da página 1', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/names/1`)
        .expectStatus(200)
        .expectJsonLike(['Aboleth']);
    });

    it('Deve retornar 500 para uma página inexistente', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/names/999`)
        .expectStatus(500);
    });
  });

  describe('GET /monsters/:name', () => {
    it('Deve retornar os detalhes do monstro "Aboleth"', async () => {
      const expectedMonster = {
        name: 'Aboleth',
        strength: 21,
        dexterity: 9,
        hit_points: 135,   
        armor_class: 17    
      };

      await spec()
        .get(`${BASE_URL}/monsters/aboleth`)
        .expectStatus(200)
        .expectJsonMatch(expectedMonster);
    });

    it('Deve retornar 500 para um monstro inexistente', async () => {
      await spec()
        .get(`${BASE_URL}/monsters/monstro-inexistente`)
        .expectStatus(500);
    });
  });

});
});