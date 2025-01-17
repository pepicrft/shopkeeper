import mock from 'mock-fs';
import mockedEnv from 'mocked-env';
import path from 'path';
import ThemekitConfig from '../../src/lib/themekit-config';

describe('filePresent()', () => {
  describe('when config.yml present returns true', () => {
    beforeAll(() => {
      mock({
        'config.yml': ''
      });
    });

    test('it returns true', () => {
      const config = new ThemekitConfig();
      expect(config.filePresent()).toBe(true);
    });

    afterAll(() => mock.restore() );
  })

  describe('when config.yml is absent', () => {
    test('it returns false', () => {
      const config = new ThemekitConfig();
      expect(config.filePresent()).toBe(false);
    });
  });
});

describe('envivronments', () => {
  describe("without interpolation", () => {
    beforeAll(() => {
      mock({
        'config.yml': mock.load(path.resolve(__dirname, `../fixtures/config.yml`))
      });
    });

    test('it has environment information', () => {
      const config = new ThemekitConfig();
      expect(config.environments().development).not.toBeNull()
    });

    afterAll(() => mock.restore() );
  });

  describe("with interpolation", () => {
    let envRestore: any;
    let password = 'password';

    beforeAll(() => {
      envRestore = mockedEnv({
        DEV_PASSWORD: password
      });
      mock({
        'config.yml': mock.load(path.resolve(__dirname, `../fixtures/config-with-env.yml`))
      })
    });

    test('it has environment information', () => {
      const config = new ThemekitConfig();
      expect(config.environments().development.password).toBe(password)
    });

    afterAll(() => {
      mock.restore();
      envRestore()
    });
  });
});
