const { expect } = require("chai");
const sinon = require("sinon");

const SalesService = require("../../../services/SalesProductsService");
const SalesModel = require("../../../models/SalesProductsModel");

const payloadSales = [
  {
    saleId: 1,
    productId: 1,
    quantity: 6,
    date: "2022-04-01T17:06:36.000Z",
  },
  {
    saleId: 1,
    productId: 1,
    quantity: 6,
    date: "2022-04-01T17:06:36.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2022-04-01T17:06:36.000Z",
  },
];

describe("Camada de service pesquisa de todas as vendas", () => {
  describe("quando o retorno não tiver dados", () => {
    before(async () => {
      sinon.stub(SalesModel, "getAll").resolves([]);
    });

    after(async () => {
      SalesModel.getAll.restore();
    });

    it("retorna um array vazio", async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.empty;
    });
  });

  describe("quando o retorno for sucesso", async () => {
    before(() => {
      sinon.stub(SalesModel, "getAll").resolves(payloadSales);
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it("retorna um array com dados", async () => {
      const response = await SalesModel.getAll();

      expect(response).to.deep.equal(payloadSales);
    });
  });
});

describe("Busca uma vanda no BD pelo id", () => {
  const oneSale = [
    {
      productId: 3,
      quantity: 15,
      date: "2022-04-01T17:06:36.000Z",
    },
  ];

  describe("retorno da busca", () => {
    before(() => {
      sinon.stub(SalesModel, "getById").resolves(oneSale);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it("retorna um produto", async () => {
      const result = await SalesService.getById(1);
      expect(result).to.deep.equal(oneSale);
    });
  });
});

describe("Insere uma nova venda no BD", () => {
  before(() => {
    sinon.stub(SalesModel, "create").resolves({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 3,
        },
      ],
    });
  });

  after(() => {
    SalesModel.create.restore();
  });

  it("quando é inserido com sucesso", async () => {
    const result = await SalesService.create([
      {
        productId: 1,
        quantity: 3,
      },
    ]);
    expect(result).to.deep.equal({
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 3,
        },
      ],
    });
  });
});

describe("Realiza uma atualização em uma venda no BD", () => {
  const dataMock = {
    saleId: 1,
    itemUpdated: [
      {
        productId: 1,
        quantity: 6,
      },
    ],
  };
  const returnById = [
    { productId: 1, quantity: 6, date: "2022-04-02T01:51:03.000Z " },
    { productId: 1, quantity: 6, date: "2022-04-02T01:51:03.000Z" },
  ];

  describe('Não havendo o produto no BD', () => {
    before(() => {
      sinon.stub(SalesModel, "update").resolves(dataMock);
      sinon.stub(SalesModel, "getById").resolves(returnById);
    });

    after(() => {
      SalesModel.update.restore();
      SalesModel.getById.restore();
    });

    it("Retorno deve ser uma mensagem de erro", async () => {
      try {
        await SalesService.update({
          id: 1,
          productId: 1,
          quantity: 6,
        });

      } catch (error) {
        expect(error.message).to.be.equal('Sale not found');
      }

    });
  })
  describe("Atualização com sucesso", () => {
    before(() => {
      sinon.stub(SalesModel, "update").resolves(dataMock);
      sinon.stub(SalesModel, "getById").resolves(returnById);
    });

    after(() => {
      SalesModel.update.restore();
      SalesModel.getById.restore();
    });

    it("quando atualizado com sucesso", async () => {
      const result = await SalesService.update({
        id: 1,
        productId: 1,
        quantity: 6,
      });

      expect(result).to.deep.equal(dataMock);
    });
  });
});
