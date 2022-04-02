const sinon = require("sinon");
const { expect } = require("chai");

const SalesController = require("../../../controllers/SalesProductsController");
const SalesService = require("../../../services/SalesProductsService");

describe("Camada de controller buscando todos os produtos", () => {
  const response = {};
  const request = {};
  const data = [
    {
      saleId: 1,
      productId: 1,
      quantity: 6,
      date: "2022-04-02T01:51:03.000Z",
    },
    {
      saleId: 1,
      productId: 1,
      quantity: 6,
      date: "2022-04-02T01:51:03.000Z",
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: "2022-04-02T01:51:03.000Z",
    },
  ];

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Quando houver dados no BD", () => {
    before(() => {
      sinon.stub(SalesService, "getAll").resolves(data);
    });

    after(() => {
      SalesService.getAll.restore();
    });

    it("Resposta esperada status 200", async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Resposta esperada um array", async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe("Camada de controller busca de produto por id", () => {
  describe("Havnedo erro na requisição", () => {
    const response = {};
    const request = {};
    const data = {};

    describe("Quando não encotrar o produto", () => {
      before(() => {
        request.body = {};
        request.params = { id: 11 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(data);
      });

      it("Resposta deverar retornar um objeto", async () => {
        await SalesController.getById(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe("Resposta devera retorna o status", () => {
      before(() => {
        sinon.stub(SalesService, "getById").resolves({ status: 404, data });
      });

      after(() => {
        SalesService.getById.restore();
      });

      it("Resposta com o status", async () => {
        await SalesController.getById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });
    });
  });

  describe("Quando hover sucesso na requisição", () => {
    const response = {};
    const request = {};
    const data = { id: 1, name: "Martelo de Thor", quantity: 10 };

    before(() => {
      request.body = {};
      request.params = { id: 11 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(data);
      sinon.stub(SalesService, "getById").resolves({ status: 200, data });
    });

    after(() => {
      SalesService.getById.restore();
    });

    it("Resposta com o status", async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Resposta deverar retornar um objeto", async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Camada de controller inserir novo produto no BD", () => {
  describe("quando o dado é inseriro com sucesso", () => {
    let response = {};
    let request = {};
    const data = [
      {
        productId: -1,
        quantity: 6,
      },
    ];
    const createData = {
      id: 8,
      itemsSold: [
        {
          productId: 1,
          quantity: 6,
        },
      ],
    };
    before(() => {
      request.body = data;
      response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.spy();
    });

    describe("sucesso", () => {
      before(() => {
        sinon.stub(SalesService, "create").resolves(createData);
      });

      after(() => {
        SalesService.create.restore();
      });
      it("status esperado com o código 201", async () => {
        await SalesController.create(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('o json com o "objeto com os dados do produto criado"', async () => {
        await SalesController.create(request, response);

        expect(response.json.calledWith(createData)).to.be.equal(true);
      });
    });
  });
});
