// vim: expandtab:ts=4:sw=4
/*
 * Copyright 2015-2016 Carsten Klein
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import fs from 'fs';
import sinon from 'sinon';

import assert from 'esaver';

import PathBuilder from 'ypo-parser-common/pathbuilder';

import AbstractUnitWriter from '../src/writer';


describe('AbstractUnitWriter',
function ()
{
    class WriterImpl extends AbstractUnitWriter
    {}

    describe('constructor',
    function ()
    {
        it('must not fail on missing options',
        function ()
        {
            assert.doesNotThrow(
            function ()
            {
                new WriterImpl(new PathBuilder('/tmp', 'ext'));
            });
        });

        it('must fail on missing pathBuilder',
        function ()
        {
            assert.throws(
            function ()
            {
                new WriterImpl();
            }, TypeError);
        });

        it('must fail on non pathBuilder',
        function ()
        {
            assert.throws(
            function ()
            {
                new WriterImpl(new Object());
            }, TypeError);
        });

        it('must fail on invalid encoding',
        function ()
        {
            assert.expect(2);

            assert.throws(
            function ()
            {
                new WriterImpl(
                    new PathBuilder('/tmp', 'ext'), {encoding:new Object()}
                );
            }, TypeError, 'explicitly undefined encoding');

            assert.throws(
            function ()
            {
                new WriterImpl(new PathBuilder('/tmp', 'ext'), {encoding:''});
            }, TypeError);
        });

        it('must fail on invalid eol',
        function ()
        {
            assert.expect(2);

            assert.throws(
            function ()
            {
                new WriterImpl(
                    new PathBuilder('/tmp', 'ext'), {eol:new Object()}
                );
            }, TypeError);

            assert.throws(
            function ()
            {
                new WriterImpl(new PathBuilder('/tmp', 'ext'), {eol:''});
            }, TypeError);
        });
    });

    const pbuilder = new PathBuilder('/tmp', 'ext');
    const pbuilderSpy = sinon.spy(pbuilder, 'buildPath');

    const cut = new WriterImpl(pbuilder);

    it('#encoding must return correct value',
    function ()
    {
        assert.equal(cut.encoding, 'utf-8');
    });

    it('#eol must return correct value',
    function ()
    {
        assert.equal(cut.eol, '\n');
    });

    it('#writeUnit() must throw',
    function ()
    {
        assert.throws(
        function ()
        {
            cut.writeUnit();
        });
    });

    it('#createWriteStream() must call upon #pathBuilder#buildPath()',
    function ()
    {
        assert.expect(2);

        cut.createWriteStream(
            {lang:{value:'en'}, ns:{value:'translation'}}
        );

        assert.equal(pbuilderSpy.getCall(0).args[0], 'en');
        assert.equal(pbuilderSpy.getCall(0).args[1], 'translation');
    });

    it('#createWriteStream() must call upon fs.createWriteStream()',
    function ()
    {
        assert.expect(2);
        const createWriteStreamSpy = sinon.spy(fs, 'createWriteStream');

        cut.createWriteStream(
            {lang:{value:'en'}, ns:{value:'translation'}}
        );

        assert.equal(
            createWriteStreamSpy.getCall(0).args[0], '/tmp/en/translation.ext'
        );
        assert.deepEqual(
            createWriteStreamSpy.getCall(0).args[1], {defaultEncoding:'utf-8'}
        );

        fs.createWriteStream.restore();
    });
});

