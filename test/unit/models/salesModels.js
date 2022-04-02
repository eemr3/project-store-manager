const { expect } = require("chai");
const sinon = require("sinon");

const connect = require("../../../models/connection");
const SalesModel = require("../../../models/SalesProductsModel");

const payloadSalesDB = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 6,
    date: "2022-04-01T17:06:36.000Z",
  },
  {
    sale_id: 1,
    product_id: 1,
    quantity: 6,
    date: "2022-04-01T17:06:36.000Z",
  },
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
    date: "2022-04-01T17:06:36.000Z",
  },
];
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
describe("devera realizar um pesquisa de todas as vendas", () => {
  describe("quando o retorno não tiver dados", () => {
    before(async () => {
      sinon.stub(connect, "execute").resolves([[]]);
    });

    after(async () => {
      connect.execute.restore();
    });

    it("retorna um array vazio", async () => {
      const response = await SalesModel.getAll();

      expect(response).to.be.empty;
    });
  });

  describe("quando o retorno for sucesso", async () => {
    before(() => {
      sinon.stub(connect, "execute").resolves([payloadSalesDB]);
    });

    after(() => {
      connect.execute.restore();
    });

    it("retorna um array com dados", async () => {
      const response = await SalesModel.getAll();

      expect(response).to.deep.equal(payloadSales);
    });
  });
});

describe("Busca uma vanda no BD pelo id", () => {
  const oneSaleDB = [
    {
      product_id: 3,
      quantity: 15,
      date: "2022-04-01T17:06:36.000Z",
    },
  ];

  const oneSale = [
    {
      productId: 3,
      quantity: 15,
      date: "2022-04-01T17:06:36.000Z",
    },
  ];

  describe("retorno da busca", () => {
    before(() => {
      sinon.stub(connect, "execute").resolves([oneSaleDB]);
    });

    after(() => {
      connect.execute.restore();
    });

    it("retorna um produto", async () => {
      const result = await SalesModel.getById(1);
      expect(result).to.deep.equal(oneSale);
    });
  });
});

describe("Insere uma nova venda no BD", () => {
  before(() => {
    const prodId = [{ insertId: 1 }];
    sinon.stub(connect, "execute").resolves(prodId);
  });

  after(() => {
    connect.execute.restore();
  });

  it("quando é inserido com sucesso", async () => {
    const result = await SalesModel.create([
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

  describe("Atualização com sucesso", () => {
    before(() => {
      sinon.stub(connect, "execute").resolves([{
          "productId": 1,
          "quantity": 6
        }]);
    });

    after(() => {
      connect.execute.restore();
    });

    it("quando atualizado com sucesso", async () => {
      const result = await SalesModel.update({id: 1, productId: 1,quantity:6});

      expect(result).to.deep.equal(dataMock);
    });
  });
});
