const sinon = require("sinon");
const { expect } = require("chai");

const ProductsController = require("../../../controllers/ProductsController");
const ProductsService = require("../../../services/ProductsService");

describe("Camada de controller buscando todos os produtos", () => {
  const response = {};
  const request = {};
  const data = [
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
    {
      id: 3,
      name: "Escudo do Capitão América",
      quantity: 30,
    },
  ];
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Quando houver dados no BD", () => {
    before(() => {
      sinon.stub(ProductsService, "getAll").resolves(data);
    });

    after(() => {
      ProductsService.getAll.restore();
    });

    it("Resposta esperada status 200", async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Resposta esperada um array", async () => {
      await ProductsController.getAll(request, response);

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
        await ProductsController.getById(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });

    describe("Resposta devera retorna o status", () => {
      before(() => {
        sinon.stub(ProductsService, "getById").resolves({ status: 404, data });
      });

      after(() => {
        ProductsService.getById.restore();
      });

      it("Resposta com o status", async () => {
        await ProductsController.getById(request, response);

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
      sinon.stub(ProductsService, "getById").resolves({ status: 200, data });
    });

    after(() => {
      ProductsService.getById.restore();
    });

    it("Resposta com o status", async () => {
      await ProductsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("Resposta deverar retornar um objeto", async () => {
      await ProductsController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe("Camada de controller inserir novo produto no BD", () => {
  describe("quando o dado informado não é válido resposta json", async () => {
    const response = {};
    const request = {};
    const data = { message: '"productId" must be greater than or equal to 1' };
    before(() => {
      request.body = { productId: -1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(data);

      sinon.stub(ProductsService, "create").resolves(data);
    });

    after(() => {
      ProductsService.create.restore();
    });

    it("resposta com json contendo a mensage", async () => {
      await ProductsController.create(request, response);

      expect(
        response.json.calledWith(data)
      ).to.be.equal(true);
    });
  });

  describe("quando o dado informado não é válido resposta do status", () => {
    const response = {};
    const request = {};
    const data = { message: "Product already exists" };

    before(() => {
      request.body = { name: "Martelo de Thor", quantity: 10 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.spy();

      sinon
        .stub(ProductsService, "create")
        .rejects(Error("Product already exists"));
    });

    after(() => {
      ProductsService.create.restore();
    });
    it("resposta com o status 409", async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });
  });

  describe("quando o dado é inseriro com sucesso", () => {
    let response = {};
    let request = {};
    const data = { name: "Manopla do Infinito", quantity: 1 };
    const createData = { id: 1, name: "Manopla do Infinito", quantity: 1 };
    before(() => {
      request.body = data;
      response = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.spy();
    });

    describe("sucesso", () => {
      before(() => {
        sinon.stub(ProductsService, "create").resolves(createData);
      });

      after(() => {
        ProductsService.create.restore();
      });
      it("status esperado com o código 201", async () => {
        await ProductsController.create(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('o json com o "objeto com os dados do produto criado"', async () => {
        await ProductsController.create(request, response);

        expect(response.json.calledWith(createData)).to.be.equal(true);
      });
    });
  });
});
