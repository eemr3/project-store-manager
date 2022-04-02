const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../../models/ProductsModel");
const ProductsService = require("../../../services/ProductsService");

describe("Camanda de service Insere um novo produto no BD", () => {
  describe("quando existe o nome do produto", () => {
    const payloadProduct = {
      name: "Capa do Batman",
      quantity: 50,
    };

    const DATA_EXAMPLE = {
      id: 2,
      name: "Capa do Batman",
      quantity: 50,
    };

    before(() => {
      const EXIST_NAME = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      };
      sinon.stub(ProductsModel, "create").resolves([{ insertId: 2 }]);
      sinon.stub(ProductsModel, "getByName").resolves([EXIST_NAME.name]);
    });

    after(() => {
      ProductsModel.create.restore();
      ProductsModel.getByName.restore();
    });

    it("retornando o erro", async () => {
      try {
        await ProductsService.create(payloadProduct);
      } catch (error) {
        expect(error.message).to.be.equal("Product already exists");
      }
    });

    it("retorno esperado", async () => {
      const result = await ProductsService.create(payloadProduct);
      expect(result).to.deep.equal(DATA_EXAMPLE);
    });
  });
});

describe("Camada de service Busca todos produtos no BD", () => {
  const payloadProducts = [
    {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    },
    {
      id: 2,
      name: "Traje de encolhimento",
      quantity: 20,
    },
  ];
  describe("quando o retorno não tiver dados", () => {
    before(async () => {
      sinon.stub(ProductsModel, "getAll").resolves([[]]);
    });

    after(async () => {
      ProductsModel.getAll.restore();
    });

    it("retorna um array vazio", async () => {
      const [response] = await ProductsService.getAll();

      expect(response).to.be.empty;
    });
  });

  describe("quando o retorno for sucesso", async () => {
    before(() => {
      sinon.stub(ProductsModel, "getAll").resolves(payloadProducts);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    it("retorna um array com dados", async () => {
      const response = await ProductsService.getAll();

      expect(response).to.be.equal(payloadProducts);
    });
  });
});

describe('Camada de service busacar produto por "id"', () => {
  const oneProduct = [
    {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    },
  ];

  describe("quando não encontra o produtor retorna uma mensagem de erro", () => {
    before(() => {
      sinon.stub(ProductsModel, "getById").resolves(oneProduct);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it("retorna um produto", async () => {
      try {
        await ProductsService.getById(1);
      } catch (error) {
        expect(error.message).to.be.equal("Product not found");
      }
    });
  });

  describe("retorno da busca", () => {
    before(() => {
      sinon.stub(ProductsModel, "getById").resolves(oneProduct);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it("retorna um produto", async () => {
      const result = await ProductsService.getById(1);
      expect(result).to.deep.include({
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      });
    });
  });
});


describe('Atualizando um produto no BD', () => {
  describe('Não existeindo o produto no BD', () => {
    before(() => {
      sinon.stub(ProductsModel, "update").resolves({
        id: 3,
        name: "Capa do Batman",
        quantity: "1000",
      });
      sinon.stub(ProductsModel, 'getById')
        .resolves([{
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
      }])
    });

    after(() => {
      ProductsModel.update.restore();
      ProductsModel.getById.restore();
    });

    it('retorna uma mensagem de erro', async () => {
      try {
        await ProductsService.update({
          id: 3,
          name: "Capa do Batman",
          quantity: "1000",
        });
      } catch (error) {
        expect(error.message).to.be.equal('Product not found')
      }
    })
  })

  describe("Atualização com sucesso", () => {
    before(() => {
      sinon.stub(ProductsModel, "update").resolves({
        id: 3,
        name: "Capa do Batman",
        quantity: "1000",
      });
      sinon.stub(ProductsModel, 'getById')
        .resolves([{
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
      }])
    });

    after(() => {
      ProductsModel.update.restore();
      ProductsModel.getById.restore();
    });

    it("quando atualizado com sucesso", async () => {
      const result = await ProductsService.update({
        id: 3,
        name: "Capa do Batman",
        quantity: "1000",
      });

      expect(result).to.deep.equal({
        id: 3,
        name: "Capa do Batman",
        quantity: "1000",
      });
    });
  });
})

describe('Deletando um produto no BD', () => {
  describe('Não havendo o produto no BD', () => {
    before(() => {
      sinon.stub(ProductsModel, "destroy").resolves();
      sinon.stub(ProductsModel, 'getById')
        .resolves([{
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
      }])
    });

    after(() => {
      ProductsModel.destroy.restore();
      ProductsModel.getById.restore();
    });

    it('Retorna uma mensagem de error', async () => {
      it('retorna uma mensagem de erro', async () => {
        try {
          await ProductsService.destroy(11);
        } catch (error) {
          expect(error.message).to.be.equal('Product not found')
        }
      })
    })
  })
})
