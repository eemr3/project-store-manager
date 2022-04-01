const { expect } = require("chai");
const sinon = require("sinon");

const connect = require("../../../models/connection");
const ProductsMoel = require("../../../models/ProductsModel");

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
describe("devera realizar um pesquisa de todos os produtos", () => {
  describe("quando o retorno não tiver dados", () => {
    before(async () => {
      sinon.stub(connect, "execute").resolves([[]]);
    });

    after(async () => {
      connect.execute.restore();
    });

    it("retorna um array vazio", async () => {
      const response = await ProductsMoel.getAll();

      expect(response).to.be.empty;
    });
  });

  describe("quando o retorno for sucesso", async () => {
    before(() => {
      sinon.stub(connect, "execute").resolves([payloadProducts]);
    });

    after(() => {
      connect.execute.restore();
    });

    it("retorna um array com dados", async () => {
      const response = await ProductsMoel.getAll();

      expect(response).to.be.equal(payloadProducts);
    });
  });
});

describe("Busca um produto no BD pelo id", () => {
  const oneProduct = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      },
    ]
  before(() => {
    const idProd = 1;
    sinon.stub(connect, "execute").resolves(oneProduct);
  });

  after(() => {
    connect.execute.restore();
  });

  it("retorna um produto", async () => {
    const result = await ProductsMoel.getById(1);
    console.log(result);
    expect(result).to.deep.include(
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10,
      },
    );
  });
});

describe("Insere um novo produto no BD", () => {
  before(() => {
    const prodId = [{ insertId: 1 }];
    sinon.stub(connect, "execute").resolves(prodId);
  });

  after(() => {
    connect.execute.restore();
  });

  it("quando é inserido com sucesso", async () => {
    const result = await ProductsMoel.create({
      id: 1,
      name: "Traje de encolhimento",
      quantity: 20,
    });
    expect(result[0].insertId).to.be.equal(1);
  });
});
