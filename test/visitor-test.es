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


import assert from 'esaver';

import PathBuilder from 'ypo-parser-common/pathbuilder';

import AbstractWriterVisitor from '../src/visitor';
import AbstractWriter from '../src/writer';


describe('AbstractWriterVisitor',
function ()
{
    class WriterImpl extends AbstractWriter
    {}

    class WriterVisitorImpl extends AbstractWriterVisitor
    {}

    describe('constructor',
    function ()
    {
        it('must fail on missing writer',
        function ()
        {
            assert.throws(
            function ()
            {
                new WriterVisitorImpl();
            }, TypeError);
        });

        it('must fail on wrong writer type',
        function ()
        {
            assert.throws(
            function ()
            {
                new WriterVisitorImpl(new Object());
            }, TypeError);
        });
    });

    const writer = new WriterImpl(new PathBuilder('/tmp', 'ext'));
    const cut = new WriterVisitorImpl(writer);
    it('#writer must return correct value',
    function ()
    {
        assert.deepEqual(cut.writer, writer);
    });
});

